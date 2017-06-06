abstract class Token {

    lineNumber: number;

    constructor(line: number) {
        this.lineNumber = line
    }
}

class EOFToken extends Token {

}

class EOEToken extends Token {

}

class StoneError extends Error {

}

const re = /^\s*((\/\/.*)|([0-9]+)|("(\\"|\\\\|\\n|[^"])*")|[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\|\|<|>|\+|-|=|{|})?/;
let sa = [
    "{",
    "12",
    "// aaa",
    ">",
    `"hoge"`,
    "  =",
]
for ( let s of sa) {
    let r = re.exec(s)
    console.log(s);

    if (r) {
        if (r[0] !== r[1]){
            console.log("スペース")
        }else if(!!r[2]) {
            console.log("コメント");
        } else if (!!r[3]) {
            console.log("数値リテラル");
        } else if (!!r[4]) {
            console.log("文字リテラル");
        } else {
            console.log("識別子");
        }
    }
    console.log("-------------");
}

class Lexer {
    hasMore: boolean;
    reader: LineNumberReader;
    queue: Token[];

    constructor(s: string) {
        this.hasMore = true;
        this.reader = new LineNumberReader(s);
        this.queue = [];
    }

    read(): Token {
        if (this.fillQueue(0)) {
            return this.queue.shift()!;
        } else {
            return new EOFToken(1);
        }
    }

    peek(i: number): Token {
        if (this.fillQueue(i)) {
            return this.queue[i];
        } else {
            return new EOFToken(1);
        }
    }

    fillQueue(i: number): boolean {
        while (i >= this.queue.length) {
            if (this.hasMore) {
                this.readLine()
            } else {
                return false
            }
        }
        return true
    }

    readLine(): void {
        let line: string;
        try {
            line = this.reader.readLine();
        }
        catch (e) {
            throw new StoneError;
        }
        if (line == null) {
            this.hasMore = false;
            return
        }
        let lineNo = this.reader.lineNumber;
        let matcher;
        let pos = 0;
        let endPos = line.length;
        while (pos < endPos) {
            let truncatedLine = line.substr(pos, endPos);
            let result = re.exec(truncatedLine)
            if (result !== null){
                this.addToken(lineNo, result);
                pos = pos + result[0].length;
            }
        }
        // this.queue.push(new IdToken(lineNo, ""))
    }

    addToken(lineNo: number, result: RegExpExecArray) {
        let m = result[1];
        if (m.length == 0) {
            if (result[2] == ""){}
        }
    }

}


class LineNumberReader {

    private lines: string[];
    lineNumber: number;

    constructor(s: string) {
        this.lines = s.split(/\r\n|\r|\n/);
        this.lineNumber = 0;
    }

    readLine(): string {
        return this.lines[this.lineNumber]
    }
}
