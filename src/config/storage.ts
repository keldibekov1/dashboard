export function loadState(key: string) {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined; 
        }
        return JSON.parse(serializedState); 
    } catch (error) {
        return undefined;
    }
}

export function saveState(key: string, state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (error) {
       
    }
}
