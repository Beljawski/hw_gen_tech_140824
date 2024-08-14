// Вывести не заблокированных юзеров не из China с положительным балансом, используя метод aggregate()
db.users.aggregate([
  {
    $match: {
      is_blocked: { $ne: true },
      country: { $ne: "China" },
      balance: { $gte: 0 },
    },
  },
]);
// Вывести имена и баланс трех случайных не заблокированных юзеров из USA и France в порядке убывания баланса, используя метод aggregate()

db.users.aggregate([
  {
    $match: {
      country: { $in: ["USA", "France"] },
      is_blocked: { $ne: true },
    },
  },
  {
    $sample: { size: 3 },
  },
  {
    $sort: { balance: -1 },
  },
  {
    $project: {
      _id: 0,
      balance: 1,
      fullname: 1,
    },
  },
]);
// Разблокировать всех юзеров с положительным балансом
db.users.updateMany({ balance: { $gt: 0 } }, { $set: { is_blocked: null } });
