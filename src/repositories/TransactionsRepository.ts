import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface AllTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): AllTransactions {
    const balance = this.getBalance();
    const transactions = this.getTransactions();

    const allTransactions = {
      transactions,
      balance,
    };

    return allTransactions;
  }

  public getTransactions(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcomes: number[] = [];
    const incomes: number[] = [];

    this.transactions.map(trans => {
      return trans.type === 'income'
        ? incomes.push(trans.value)
        : outcomes.push(trans.value);
    });

    const income = incomes.reduce((sum, value) => sum + value, 0);
    const outcome = outcomes.reduce((sum, value) => sum + value, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
