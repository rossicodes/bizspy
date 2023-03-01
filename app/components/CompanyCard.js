import niches from '../../utils/niches'


export default function CompanyCard({ row }) {

    const key = row.id.toString()

    function capitalize(str) {
        if (str === null || str === undefined) { return ''; } else {
            return str
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    }

    function niche(sic_code) {
        for (var i = 0; i < niches.length; i++) {
            // look for the entry with a matching `sic` value
            if (niches[i].sic == sic_code) {
                return niches[i].name
            }
        }
    }

    return (
        < div className="flex flex-row justify-between bg-white p-6 rounded-lg shadow-lg text-sm" >
            <div className="flex flex-col">
                <h3 className="text-base font-extrabold">{row.name}</h3>
                <p className="truncate text-sm">{capitalize(row.address_1)}</p>
                <p className="truncate text-sm">{capitalize(row.town)}</p>
                <p className="truncate text-sm">{row.postcode}</p>
                <div className='flex flex-wrap gap-2 mt-2 w-full'>
                    <div className='mt-2 mb-2 rounded-full px-2 py-0.5 text-xs bg-green-100 text-green-600'>
                        <p>
                            {niche(row.sic_code_1) ? niche(row.sic_code_1) : row.sic_code_1.substring(row.sic_code_1.indexOf("-") + 1)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex">

                <a target="_blank" href={`${row.accounts_link_1}`} rel="noopener noreferrer">
                    <button
                        type="button"
                        className="h-min w-full items-center rounded-md border border-transparent bg-green-100 text-green-600 px-4 py-1 text-xs font-bold hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        ACCOUNTS
                    </button>
                </a>
            </div>
        </div >
    )



}