interface RedisConfigProps {
    host: string;
    port: number;
}

interface ApiConfigProps {
    apiUrl: string;
    httpTimeout: number;
    jwtSecret: string;
}

interface PostgresConfigProps {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
}

interface GqlConfigProps {
    autoSchemaFile: boolean;
}

export interface ConfigProps {
    port: number;
    api: ApiConfigProps;
    postgres: {
        database: PostgresConfigProps;
    };
    graphql: GqlConfigProps;
    redis: RedisConfigProps;
}
