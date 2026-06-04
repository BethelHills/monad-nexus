import { protocolDirectory } from "@/lib/landing-data";

export function ProtocolUniverse() {
  return (
    <section className="border-b border-[#242424] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A3A3A3]">
            Protocol universe
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Directory
          </h2>
        </div>

        <div className="hidden overflow-hidden rounded-xl border border-[#242424] md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#242424] bg-[#141414] text-xs uppercase tracking-wider text-[#A3A3A3]">
              <tr>
                <th className="px-5 py-3 font-medium">Protocol</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Signal</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242424] bg-[#0E0E0E]">
              {protocolDirectory.map((row) => (
                <tr key={row.protocol} className="text-white">
                  <td className="px-5 py-4 font-medium">{row.protocol}</td>
                  <td className="px-5 py-4 text-[#A3A3A3]">{row.category}</td>
                  <td className="px-5 py-4 text-[#B7FF7A]">{row.signal}</td>
                  <td className="px-5 py-4 text-[#A3A3A3]">{row.risk}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4 text-xs font-medium">
                      <button
                        type="button"
                        className="text-[#14F195] hover:underline"
                      >
                        Analyze
                      </button>
                      <button
                        type="button"
                        className="text-[#A3A3A3] hover:text-white hover:underline"
                      >
                        Add to Watchlist
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 md:hidden">
          {protocolDirectory.map((row) => (
            <li
              key={row.protocol}
              className="rounded-xl border border-[#242424] bg-[#0E0E0E] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-white">{row.protocol}</p>
                <span className="text-xs text-[#A3A3A3]">{row.category}</span>
              </div>
              <p className="mt-2 text-sm text-[#B7FF7A]">{row.signal}</p>
              <p className="mt-1 text-xs text-[#A3A3A3]">Risk: {row.risk}</p>
              <div className="mt-4 flex gap-4 text-xs font-medium">
                <button type="button" className="text-[#14F195]">
                  Analyze
                </button>
                <button type="button" className="text-[#A3A3A3]">
                  Watchlist
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
