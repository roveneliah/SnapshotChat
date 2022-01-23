import { sortWith, ascend } from "ramda"

export function SignatureList({ signers }) {

    const statusOrder = {
        Against: 1,
        Approve: 2,
        Abstain: 3,
        Pending: 4
    }

    const colors = {
        Approve: "py-4 px-6 text-sm text-green-500 whitespace-nowrap dark:text-green-400",
        Against: "py-4 px-6 text-sm text-red-500 whitespace-nowrap dark:text-red-400",
        Abstain: "py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400",
        Pending: "py-4 px-6 text-sm text-yellow-500 whitespace-nowrap dark:text-yellow-300",
    }

    const row = ({ signer, status, signature, tag }) => (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class={colors[status]}>
                {status}
            </td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {signer}
            </td>
            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {tag}
            </td>
            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {signature}
            </td>
        </tr>
    )

    const sortedSigners = sortWith([ascend(({ status }) => statusOrder[status])])(signers)
    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow-md sm:rounded-lg">
                        <table class="min-w-full">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Status
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Signer
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Tags
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Signature
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedSigners.map(row)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}