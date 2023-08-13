export const getFibonacciNumbers = (n: number): number[] => {
    let res: number[] = [1, 1];
    for (let i = 2; i < n + 1; i ++) {
        res.push(res[i - 2] + res[i - 1])       
    }   
    return res;
}