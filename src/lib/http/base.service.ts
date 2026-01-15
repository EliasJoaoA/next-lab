type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions{
    headers?: HeadersInit;
    body?: any;
    cache?: RequestCache;
    next?: NextFetchRequestConfig
}

export abstract class BaseService{
    protected baseUrl = process.env.API_URL

    protected async request<T>(
        method: HttpMethod,
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
            cache: options.cache,
            next: options.next
        });

        if (!response.ok) {
            // throw this.handleError(response);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }

    protected get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request<T>('GET', endpoint, options);
    }

    protected post<T>(endpoint: string, body: any, options?: RequestOptions): Promise<T> {
        return this.request<T>('POST', endpoint, { ...options, body });
    }

    protected put<T>(endpoint: string, body: any, options?: RequestOptions): Promise<T> {
        return this.request<T>('PUT', endpoint, { ...options, body });
    }

    protected delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return this.request<T>('DELETE', endpoint, options);
    } 

    private async handleError(response: Response): Promise<never> {
        let message = 'Erro inesperado'

        try{
            const data = await response.json();
            message = data.message ?? message;
        } catch{}
        throw new Error(message);
    }
    
}