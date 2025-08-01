declare module 'pdf2pic' {
  interface ConvertOptions {
    density?: number;
    saveFilename?: string;
    savePath?: string;
    format?: 'png' | 'jpeg' | 'jpg';
    width?: number;
    height?: number;
    quality?: number;
    preserveAspectRatio?: boolean;
    compression?: string;
  }

  interface ConvertResult {
    name: string;
    size: number;
    fileType: string;
    width: number;
    height: number;
    density: number;
    outputType: string;
    page: number;
    path: string;
  }

  interface ResponseOptions {
    responseType?: 'image' | 'base64' | 'buffer';
  }

  export function fromPath(
    filePath: string, 
    options: ConvertOptions
  ): (page: number, responseOptions?: ResponseOptions) => Promise<ConvertResult>;

  export function fromBuffer(
    buffer: Buffer, 
    options: ConvertOptions
  ): (page: number, responseOptions?: ResponseOptions) => Promise<ConvertResult>;

  export function fromBase64(
    base64String: string, 
    options: ConvertOptions
  ): (page: number, responseOptions?: ResponseOptions) => Promise<ConvertResult>;
}
