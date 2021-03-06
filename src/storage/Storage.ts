export abstract class Storage {
    abstract info(): Promise<string | undefined>;
    abstract image(path: string): Promise<Buffer | string | undefined>;
    abstract blob(path: string): Promise<Buffer | undefined>;
    abstract repos(): Promise<string[] | undefined>;
    abstract getRepo(): Promise<string | null>;
    abstract read(path: string): Promise<Buffer>;
    abstract readJSON(path: string): Promise<any>;
    abstract readdir(path: string): Promise<string[]>;
    abstract saveJSON(file: string, data: any): Promise<void>;
    abstract saveFile(file: string, data: string): Promise<void>;
    abstract copy(src: string, dst: string): Promise<void>;
    abstract copyBlob(src: string, dst: string): Promise<void>;
    abstract remove(file: string): Promise<void>;
}
