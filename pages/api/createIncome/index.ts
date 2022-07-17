// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'


export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    const { description, incomes, date } = req.body

    const result = await prisma.incomes.create({
        data: {
          description: description,
          incomes: incomes,
          date: date,
        },
      });
    res.status(200).json(result)
}

