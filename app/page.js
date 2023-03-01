import prisma from '../db/prisma';
import CompanyCard from './components/CompanyCard';
import { Nunito } from '@next/font/google'
import Table from './components/Table';

const nunito = Nunito({ subsets: ['latin'] })

const getData = async () => {
  const skip = 0;
  const data = await prisma.companies.findMany(
    {
      skip,
      take: 10, // Page size
      orderBy: {
        name: 'asc', // Replace 'columnName' with the name of the column you want to order by
      },
    })
  return { data, skip };
}

export default async function Home() {
  const { data, skip } = await getData();

  return (
    <main className={nunito.className}>
      <div className="mt-20 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="font-extrabold text-2xl tracking-tight sm:text-2xl">Business Spy</h1>
        </div>
        <Table data={data} skip={skip} />
      </div>
    </main >
  )
}
