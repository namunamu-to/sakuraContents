const KEYWORDS = [
    'def', 'if', 'else', 'while', 'return', 'func', 'var', 'let', 'const', 'set'
];

function tokenize(src){
    const tokens = [];
    let pos = 0;
    while(pos < src.length){
        if(src[pos] === "("){
            tokens.push({type: "LPAREN", value: "(", pos});
            pos++;
            continue;
        }
        if(src[pos] === ")"){
            tokens.push({type: "RPAREN", value: ")", pos});
            pos++;
            continue;
        }
        if(src[pos] === "'"){
            tokens.push({type: "QUOTE", value: "'", pos});
            pos++;
            continue;
        }
        if(/\s/.test(src[pos])){
            pos++;
            continue;
        }
        if(/[0-9]/.test(src[pos])){
            let numStr = "";
            while(pos < src.length && /[0-9]/.test(src[pos])){
                numStr += src[pos];
                pos++;
            }
            tokens.push({type: "NUMBER", value: numStr, pos});
            continue;
        }
        if(src[pos] === '<'){
            if(pos + 1 < src.length && src[pos+1] === '='){
                tokens.push({type: "IDENTIFIER", value: "<=", pos});
                pos += 2;
            } else {
                tokens.push({type: "IDENTIFIER", value: "<", pos});
                pos++;
            }
            continue;
        }
        if(src[pos] === '>'){
            if(pos + 1 < src.length && src[pos+1] === '='){
                tokens.push({type: "IDENTIFIER", value: ">=", pos});
                pos += 2;
            } else {
                tokens.push({type: "IDENTIFIER", value: ">", pos});
                pos++;
            }
            continue;
        }
        if(src[pos] === '!'){
            if(pos + 1 < src.length && src[pos+1] === '='){
                tokens.push({type: "IDENTIFIER", value: "!=", pos});
                pos += 2;
            } else {
                tokens.push({type: "IDENTIFIER", value: "!", pos});
                pos++;
            }
            continue;
        }
        if(src[pos] === '='){
            if(pos + 1 < src.length && src[pos+1] === '='){
                tokens.push({type: "IDENTIFIER", value: "==", pos});
                pos += 2;
            } else {
                tokens.push({type: "IDENTIFIER", value: "=", pos});
                pos++;
            }
            continue;
        }
        if(src[pos] === '"'){
            let str = "";
            pos++; // skip opening quote
            while(pos < src.length && src[pos] !== '"'){
                str += src[pos];
                pos++;
            }
            if(pos >= src.length){
                throw new Error("Unterminated string literal");
            }
            pos++; // skip closing quote
            tokens.push({type: "STRING", value: str, pos});
            continue;
        }
        if(/[a-zA-Z_\/+*-]/.test(src[pos])){
            let idStr = "";
            while(pos < src.length && /[^()\s]/.test(src[pos])){
                idStr += src[pos];
                pos++;
            }
            const type = KEYWORDS.includes(idStr) ? "KEYWORD" : "IDENTIFIER";
            tokens.push({type, value: idStr, pos});
            continue;
        }
        throw new Error(`Unexpected character: ${src[pos]} at position ${pos}`);
    }
    return tokens;
}

function parseExpression(tokens, index) {
    if (tokens[index].type === "QUOTE") {
        const [expr, newIndex] = parseExpression(tokens, index + 1);
        return [['quote', expr], newIndex];
    }
    if (tokens[index].type === "NUMBER") {
        return [parseInt(tokens[index].value), index + 1];
    }
    if (tokens[index].type === "STRING") {
        return [{ type: 'string', value: tokens[index].value }, index + 1];
    }
    if (tokens[index].type === "IDENTIFIER" || tokens[index].type === "KEYWORD") {
        return [tokens[index].value, index + 1];
    }
    if (tokens[index].type === "LPAREN") {
        index++;
        const list = [];
        while (index < tokens.length && tokens[index].type !== "RPAREN") {
            const [expr, newIndex] = parseExpression(tokens, index);
            list.push(expr);
            index = newIndex;
        }
        if (index >= tokens.length) {
            throw new Error("Unmatched parenthesis");
        }
        index++; // skip RPAREN
        return [list, index];
    } else if (tokens[index].type === "NUMBER") {
        return [parseInt(tokens[index].value), index + 1];
    } else {
        return [tokens[index].value, index + 1];
    }
}

function parseLisp(src){
    const tokens = tokenize(src);
    const asts = [];
    let index = 0;
    while (index < tokens.length) {
        if (tokens[index].type === "RPAREN") {
            index++;
            continue;
        }
        const [ast, newIndex] = parseExpression(tokens, index);
        asts.push(ast);
        index = newIndex;
    }
    return asts;
}

function evaluate(ast, env) {
    if (typeof ast === 'number') {
        return ast;
    }
    if (ast && typeof ast === 'object' && ast.type === 'string') {
        return ast.value;
    }
    if (typeof ast === 'string') {
        if (env[ast] !== undefined) {
            return env[ast];
        }
        throw new Error(`Undefined variable: ${ast}`);
    }
    if (Array.isArray(ast)) {
        const [op, ...args] = ast;
        if (typeof op !== 'string') {
            // list of expressions
            let result;
            for (let expr of ast) {
                result = evaluate(expr, env);
                if (result && result.type === 'return') {
                    return result.value;
                }
            }
            return result;
        } else if (op === 'def') {
            const [varName, val] = args;
            env[varName] = evaluate(val, env);
            return env[varName];
        } else if (op === 'func') {
            const [name, params, ...body] = args;
            env[name] = { type: 'function', params, body };
            return env[name];
        } else if (op === '+') {
            const [a, b] = args;
            return evaluate(a, env) + evaluate(b, env);
        } else if (op === '-') {
            const [a, b] = args;
            return evaluate(a, env) - evaluate(b, env);
        } else if (op === '*') {
            const [a, b] = args;
            return evaluate(a, env) * evaluate(b, env);
        } else if (op === '/') {
            const [a, b] = args;
            return evaluate(a, env) / evaluate(b, env);
        } else if (op === 'car') {
            const [lst] = args;
            const list = evaluate(lst, env);
            if (Array.isArray(list)) {
                return list[0];
            }
            throw new Error('car expects a list');
        } else if (op === 'cdr') {
            const [lst] = args;
            const list = evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.slice(1);
            }
            throw new Error('cdr expects a list');
        } else if (op === 'cons') {
            const [elem, lst] = args;
            const element = evaluate(elem, env);
            const list = evaluate(lst, env);
            if (Array.isArray(list)) {
                return [element, ...list];
            }
            throw new Error('cons expects a list as second argument');
        } else if (op === 'list') {
            return args.map(arg => evaluate(arg, env));
        } else if (op === 'length') {
            const [lst] = args;
            const list = evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.length;
            }
            throw new Error('length expects a list');
        } else if (op === 'reverse') {
            const [lst] = args;
            const list = evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.slice().reverse();
            }
            throw new Error('reverse expects a list');
        } else if (op === 'append') {
            const lists = args.map(arg => evaluate(arg, env));
            return lists.flat();
        } else if (op === '<') {
            const [a, b] = args;
            return evaluate(a, env) < evaluate(b, env);
        } else if (op === '>') {
            const [a, b] = args;
            return evaluate(a, env) > evaluate(b, env);
        } else if (op === '<=') {
            const [a, b] = args;
            return evaluate(a, env) <= evaluate(b, env);
        } else if (op === '>=') {
            const [a, b] = args;
            return evaluate(a, env) >= evaluate(b, env);
        } else if (op === '==') {
            const [a, b] = args;
            return evaluate(a, env) == evaluate(b, env);
        } else if (op === '!=') {
            const [a, b] = args;
            return evaluate(a, env) != evaluate(b, env);
        } else if (op === '!') {
            const [a] = args;
            return ! evaluate(a, env);
        } else if (op === 'if') {
            const [condition, thenExpr, elseExpr] = args;
            if (evaluate(condition, env)) {
                return evaluate(thenExpr, env);
            } else if (elseExpr) {
                return evaluate(elseExpr, env);
            } else {
                return undefined;
            }
        } else if (op === 'set') {
            const [varName, val] = args;
            if (env[varName] === undefined) {
                throw new Error(`Undefined variable: ${varName}`);
            }
            env[varName] = evaluate(val, env);
            return env[varName];
        } else if (op === 'while') {
            const [condition, ...body] = args;
            while (evaluate(condition, env)) {
                for (let expr of body) {
                    evaluate(expr, env);
                }
            }
            return undefined;
        } else if (op === 'return') {
            const [val] = args;
            return { type: 'return', value: evaluate(val, env) };
        } else if (op === 'quote') {
            const [val] = args;
            return val;
        } else if (op === 'cout') {
            const [outputId, expr] = args;
            const value = evaluate(expr, env);
            document.getElementById(outputId).value += lispString(value) + '\n';
            return value;
        } else {
            // function call
            const func = env[op];
            if (func && func.type === 'function') {
                const { params, body } = func;
                const localEnv = { ...env };
                params.forEach((param, i) => {
                    localEnv[param] = evaluate(args[i], localEnv);
                });
                // evaluate body
                let result;
                if (Array.isArray(body) && body.length > 0 && Array.isArray(body[0])) {
                    // multiple expressions
                    for (let expr of body) {
                        result = evaluate(expr, localEnv);
                        if (result && result.type === 'return') {
                            return result.value;
                        }
                    }
                } else {
                    // single expression
                    result = evaluate(body, localEnv);
                }
                return result;
            } else {
                throw new Error(`Undefined function: ${op}`);
            }
        }
    }
    throw new Error(`Unknown AST node: ${ast}`);
}

function lispString(obj) {
    if (Array.isArray(obj)) {
        return '(' + obj.map(lispString).join(' ') + ')';
    } else {
        return obj.toString();
    }
}

function runLisp(src){
    const ast = parseLisp(src);
    const env = {};
    env['nil'] = [];
    ast.forEach(expr => evaluate(expr, env));
}