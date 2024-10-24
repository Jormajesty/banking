import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "@/components/BankTabItem";
import BankInfo from "@/components/BankInfo";
import TransactionTable from "@/components/TransactionsTable";
import { Pagination } from "./Pagination";
import { getAccount } from "@/lib/actions/bank.actions";

const RecentTransactions = async ({ accounts, transactions = [], appwriteItemId, page = 1 }: RecentTransactionsProps) => {
  const account = await getAccount({ appwriteItemId })
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  return (
    <section className={"recent-transactions"}>
      <header className={"flex items-center justify-between"}>
        <h2 className={"recent-transactions-label"}>Recent Transactions</h2>
        <Link className={"view-all-btn"} href={`/transaction-history/?id=${appwriteItemId}`}>
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className={"recent-transactions-tablist"}>
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent value={account.appwriteItemId} key={account.id} className={"space-y-4"}>
            <BankInfo account={account} type={"full"} appwriteItemId={appwriteItemId} />
            <TransactionTable transactions={currentTransactions} />
            {totalPages > 1 && (
              <div className={"my-4 w-full"}>
                <Pagination page={page} totalPages={totalPages} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;