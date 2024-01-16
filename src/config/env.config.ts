require('dotenv').config();

const envPrefix = 'EINSBYM_API_';

class RequiredEnvNotProvided extends Error {
    constructor(envName: string) {
        super(`required env \"${envName}\" was not provided`);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

export function env(name: string, options: { defaultValue?: string; required?: boolean } = { required: true }): string {
    const envName = envPrefix + name;
    const envValue = process.env[envName];

    if (!envValue && options.required && !options.defaultValue) {
        throw new RequiredEnvNotProvided(envName);
    }

    return envValue || options.defaultValue;
}
