import prisma from '../../../db/prisma';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const skipNo = searchParams.get('number');
    const number = parseInt(skipNo) || 0;
    const rows = await prisma.companies.findMany({
        take: 10,
        skip: number,
        orderBy: {
            name: 'asc', // Replace 'columnName' with the name of the column you want to order by
        },
    });
    return Response.json({ rows });
}
