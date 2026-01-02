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
        if(src[pos] === ';'){
            while(pos < src.length && src[pos] !== '\n'){
                pos++;
            }
            continue;
        }
        // number literal: [+|-]?[0-9]+(\.[0-9]+)?
        if (
            /[0-9]/.test(src[pos]) ||
            ((src[pos] === '+' || src[pos] === '-') &&
            /[0-9]/.test(src[pos + 1]))
        ) {
            let numStr = "";

            // sign
            if (src[pos] === '+' || src[pos] === '-') {
                numStr += src[pos];
                pos++;
            }

            // integer part (必須)
            while (pos < src.length && /[0-9]/.test(src[pos])) {
                numStr += src[pos];
                pos++;
            }

            // fractional part (任意)
            if (src[pos] === '.' && /[0-9]/.test(src[pos + 1])) {
                numStr += '.';
                pos++;
                while (pos < src.length && /[0-9]/.test(src[pos])) {
                    numStr += src[pos];
                    pos++;
                }
            }

            tokens.push({
                type: "NUMBER",
                value: numStr,
                pos
            });
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
        if(/[a-zA-Z_\/+*%-]/.test(src[pos])){
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
        return [Number(tokens[index].value), index + 1];
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

let yieldCounter = 0;

function* maybeYield() {
    if (++yieldCounter % 5000 === 0) {
        yield 'PAUSE';
    }
}

function* evaluate(ast, env) {
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
                result = yield* evaluate(expr, env);
                if (result && result.type === 'return') {
                    return result.value;
                }
            }
            return result;
        } else if (op === 'def') {
            const [varName, val] = args;
            env[varName] = yield* evaluate(val, env);
            return env[varName];
        } else if (op === 'func') {
            const [name, params, ...body] = args;
            env[name] = { type: 'function', params, body };
            return env[name];
        } else if (op === '+') {
            let sum = 0;
            for (const arg of args) sum += (yield* evaluate(arg, env));
            return sum;
        } else if (op === '-') {
            if (args.length === 1) return -(yield* evaluate(args[0], env));
            let result = yield* evaluate(args[0], env);
            for (let i = 1; i < args.length; i++) result -= (yield* evaluate(args[i], env));
            return result;
        } else if (op === '*') {
            let result = 1;
            for (const arg of args) result *= (yield* evaluate(arg, env));
            return result;
        } else if (op === '/') {
            if (args.length === 1) return 1 / (yield* evaluate(args[0], env));
            let result = yield* evaluate(args[0], env);
            for (let i = 1; i < args.length; i++) result /= (yield* evaluate(args[i], env));
            return result;
        } else if (op === '%' || op === 'mod') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) % (yield* evaluate(b, env));
        } else if (op === 'car') {
            const [lst] = args;
            const list = yield* evaluate(lst, env);
            if (Array.isArray(list)) {
                return list[0];
            }
            throw new Error('car expects a list');
        } else if (op === 'cdr') {
            const [lst] = args;
            const list = yield* evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.slice(1);
            }
            throw new Error('cdr expects a list');
        } else if (op === 'cons') {
            const [elem, lst] = args;
            const element = yield* evaluate(elem, env);
            const list = yield* evaluate(lst, env);
            if (Array.isArray(list)) {
                return [element, ...list];
            }
            throw new Error('cons expects a list as second argument');
        } else if (op === 'list') {
            const result = [];
            for (const arg of args) result.push((yield* evaluate(arg, env)));
            return result;
        } else if (op === 'length') {
            const [lst] = args;
            const list = yield* evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.length;
            }
            throw new Error('length expects a list');
        } else if (op === 'reverse') {
            const [lst] = args;
            const list = yield* evaluate(lst, env);
            if (Array.isArray(list)) {
                return list.slice().reverse();
            }
            throw new Error('reverse expects a list');
        } else if (op === 'append') {
            const lists = [];
            for (const arg of args) lists.push((yield* evaluate(arg, env)));
            return lists.flat();
        } else if (op === '<') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) < (yield* evaluate(b, env));
        } else if (op === '>') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) > (yield* evaluate(b, env));
        } else if (op === '<=') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) <= (yield* evaluate(b, env));
        } else if (op === '>=') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) >= (yield* evaluate(b, env));
        } else if (op === '==') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) == (yield* evaluate(b, env));
        } else if (op === '!=') {
            const [a, b] = args;
            return (yield* evaluate(a, env)) != (yield* evaluate(b, env));
        } else if (op === '!') {
            const [a] = args;
            return !(yield* evaluate(a, env));
        } else if (op === 'and') {
            const [a, b] = args;
            const valA = yield* evaluate(a, env);
            if (!valA) return valA;
            return yield* evaluate(b, env);
        } else if (op === 'or') {
            const [a, b] = args;
            const valA = yield* evaluate(a, env);
            if (valA) return valA;
            return yield* evaluate(b, env);
        } else if (op === 'if') {
            const [condition, thenExpr, elseExpr] = args;
            if (yield* evaluate(condition, env)) {
                return yield* evaluate(thenExpr, env);
            } else if (elseExpr) {
                return yield* evaluate(elseExpr, env);
            } else {
                return undefined;
            }
        } else if (op === 'set') {
            const [varName, val] = args;
            if (env[varName] === undefined) {
                throw new Error(`Undefined variable: ${varName}`);
            }
            env[varName] = yield* evaluate(val, env);
            return env[varName];
        } else if (op === 'while') {
            const [condition, ...body] = args;
            while (yield* evaluate(condition, env)) {
                for (let expr of body) {
                    yield* evaluate(expr, env);
                }
                yield* maybeYield();
            }
            return undefined;
        } else if (op === 'switch') {
            const [valExpr, ...clauses] = args;
            const val = yield* evaluate(valExpr, env);
            for (const clause of clauses) {
                if (Array.isArray(clause) && clause.length > 0) {
                    const [type, ...rest] = clause;
                    if (type === 'case') {
                        const [key, ...body] = rest;
                        let isMatch = false;
                        // キーが識別子(文字列)や数値の場合は直接比較
                        if (key === val) {
                            isMatch = true;
                        } 
                        // キーが文字列リテラルオブジェクトの場合は値を取り出して比較
                        else if (key && typeof key === 'object' && key.type === 'string' && key.value === val) {
                            isMatch = true;
                        }

                        if (isMatch) {
                            let result;
                            for (let expr of body) {
                                result = yield* evaluate(expr, env);
                            }
                            return result;
                        }
                    } else if (type === 'default') {
                        let result;
                        for (let expr of rest) {
                            result = yield* evaluate(expr, env);
                        }
                        return result;
                    }
                }
            }
            return undefined;
        } else if (op === 'return') {
            const [val] = args;
            return { type: 'return', value: yield* evaluate(val, env) };
        } else if (op === 'quote') {
            const [val] = args;
            return val;
        } else if (op === 'cout') {
            const [outputId, expr] = args;
            const value = yield* evaluate(expr, env);
            document.getElementById(outputId).value += lispString(value) + '\n';
            return value;
        } else if (op === 'fillRect') {
            const [outputId, xExpr, yExpr, wExpr, hExpr, colorExpr] = args;

            const x = yield* evaluate(xExpr, env);
            const y = yield* evaluate(yExpr, env);
            const w = yield* evaluate(wExpr, env);
            const h = yield* evaluate(hExpr, env);
            const color = colorExpr ? yield* evaluate(colorExpr, env) : null;

            const ctx = getCtx(outputId);
            if (color) ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);

            return 0;
        } else {
            // function call
            const func = env[op];
            if (func && func.type === 'function') {
                const { params, body } = func;
                const localEnv = { ...env };
                for (let i = 0; i < params.length; i++) {
                    localEnv[params[i]] = yield* evaluate(args[i], env);
                }
                // evaluate body
                let result;
                if (Array.isArray(body) && body.length > 0 && Array.isArray(body[0])) {
                    // multiple expressions
                    for (let expr of body) {
                        result = yield* evaluate(expr, localEnv);
                        if (result && result.type === 'return') {
                            return result.value;
                        }
                    }
                } else {
                    // single expression
                    result = yield* evaluate(body, localEnv);
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
const canvases = {}

function getCtx(outputID) {
  if (!canvases[outputID]) {
    const canvas = document.getElementById(outputID)
    canvases[outputID] = canvas.getContext("2d")
  }
  return canvases[outputID]
}

function* evaluateProgram(ast, env) {
    for (const expr of ast) {
        yield* evaluate(expr, env);
    }
}

function runLisp(src){
    const ast = parseLisp(src);
    const env = {};
    env['nil'] = [];
    yieldCounter = 0;
    
    const iterator = evaluateProgram(ast, env);
    
    function step() {
        const start = Date.now();
        while (true) {
            const { value, done } = iterator.next();
            if (done) break;
            if (value === 'PAUSE' || Date.now() - start > 100) {
                requestAnimationFrame(step);
                return;
            }
        }
    }
    
    step();
}