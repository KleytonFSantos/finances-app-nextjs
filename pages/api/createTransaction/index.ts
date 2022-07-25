import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'



export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    const { description, value, date, category } = req.body

    const result = await prisma.finances.create({
        data: {
          id: randomUUID(),
          description: description,
          value: value,
          category: category,
          date: date,
        },
      });
    res.status(200).json(result)
}