export function findDuplicateAmounts(data: any) {
    const seenAmounts = new Map();
    const duplicates:any[] = [];

    for (const row of data) {
        for (const cell of row) {
            if (seenAmounts.has(cell.amount)) {
                const existingDuplicate = duplicates.find(d => d.amount === cell.amount);
                if (!existingDuplicate) {
                    duplicates.push({
                        id: cell.id,
                        amount: cell.amount
                    });
                }
            } else {
                seenAmounts.set(cell.amount, true);
            }
        }
    }

    return duplicates;
}

export function calculatePercentage(value: number, sum: number) {
    if (sum === 0) {
      return '0%';
    }
    const percentage = (value / sum) * 100;
    return `${percentage.toFixed(1)}%`;
}