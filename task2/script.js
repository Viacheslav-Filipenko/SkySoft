const sum = (a, b) => {
    let s = 0;
    if (!a && !b && !s) return 0;
    const y = (a, b) => {
        if (a && !b) {
            s+=a;
        } else if (a && b) {
            s+=a+b;
        } else if (!a && !b) {
            return s;
        }
        return y;
    }
    return y(a,b);
}