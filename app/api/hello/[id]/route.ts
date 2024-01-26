interface IRequestHello {
    params: { id: string };
}

export async function GET(request: Request, { params }: IRequestHello) {
    console.log('params id: ', params.id);

    return Response.json({ message: 'hello world', data: params });
}
