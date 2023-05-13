export const isValidEmail = (value: string) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));
export const isValidPassword = (value: string) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{6,}$/.test(value));
export const isValidDiscordTag = (value: string) => (/^[a-zA-Z0-9_]{2,32}#\d{4}$/.test(value));
