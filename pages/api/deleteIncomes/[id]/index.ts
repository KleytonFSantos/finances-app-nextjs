// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.query
        const result = await prisma.incomes.delete({
            where: {
                id: Number(id),
            },
        })
        res.status(200).json(result)
    }
}

