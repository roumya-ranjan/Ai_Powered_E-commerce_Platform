export function getTokenPayload() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export function getUserId() {
    const payload = getTokenPayload();
    return payload?.userId || null;
}

export function getRole() {
    return getTokenPayload()?.role || null;
}

export function isAdmin() {
    return getRole() === "ADMIN";
}

export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
}