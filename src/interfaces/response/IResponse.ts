export default interface IResponse<T> {
    httpCode: number,
    requestId: string,
    errors: string[],
    data: T,
    message: string
}