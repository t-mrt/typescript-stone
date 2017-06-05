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

const re = /\s*((\/\/.*)|([0-9]+)|("(\\"|\\\\|\\n|[^"])*")|[A-Z_a-z][A-Z_a-z0-9]*|==|<=|>=|&&|\|\|<|>|\+|-|=|{|})?/;

console.log(re.exec("while i < 10 {"));

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
            line = this.reader.readLine(); // 例外を生成します
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
