import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _articles from  "./articles.js";
import _bans from  "./bans.js";
import _categories from  "./categories.js";
import _categories_articles from  "./categories_articles.js";
import _comments from  "./comments.js";
import _config from  "./config.js";
import _logins from  "./logins.js";
import _movies from  "./movies.js";
import _permissions from  "./permissions.js";
import _rank from  "./rank.js";
import _snapchat from  "./snapchat.js";
import _subcategories from  "./subcategories.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const articles = _articles.init(sequelize, DataTypes);
  const bans = _bans.init(sequelize, DataTypes);
  const categories = _categories.init(sequelize, DataTypes);
  const categories_articles = _categories_articles.init(sequelize, DataTypes);
  const comments = _comments.init(sequelize, DataTypes);
  const config = _config.init(sequelize, DataTypes);
  const logins = _logins.init(sequelize, DataTypes);
  const movies = _movies.init(sequelize, DataTypes);
  const permissions = _permissions.init(sequelize, DataTypes);
  const rank = _rank.init(sequelize, DataTypes);
  const snapchat = _snapchat.init(sequelize, DataTypes);
  const subcategories = _subcategories.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  categories_articles.belongsTo(articles, { as: "article", foreignKey: "article_id"});
  articles.hasMany(categories_articles, { as: "categories_articles", foreignKey: "article_id"});
  comments.belongsTo(articles, { as: "article", foreignKey: "article_id"});
  articles.hasMany(comments, { as: "comments", foreignKey: "article_id"});
  articles.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(articles, { as: "articles", foreignKey: "category_id"});
  subcategories.belongsTo(categories, { as: "categorie", foreignKey: "categorie_id"});
  categories.hasMany(subcategories, { as: "subcategories", foreignKey: "categorie_id"});
  permissions.belongsTo(rank, { as: "rank", foreignKey: "rank_id"});
  rank.hasMany(permissions, { as: "permissions", foreignKey: "rank_id"});
  users.belongsTo(rank, { as: "rank", foreignKey: "rank_id"});
  rank.hasMany(users, { as: "users", foreignKey: "rank_id"});
  categories_articles.belongsTo(subcategories, { as: "subcategorie", foreignKey: "subcategorie_id"});
  subcategories.hasMany(categories_articles, { as: "categories_articles", foreignKey: "subcategorie_id"});
  articles.belongsTo(users, { as: "author_user", foreignKey: "author"});
  users.hasMany(articles, { as: "articles", foreignKey: "author"});
  bans.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(bans, { as: "bans", foreignKey: "user"});
  comments.belongsTo(users, { as: "author", foreignKey: "author_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "author_id"});
  logins.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(logins, { as: "logins", foreignKey: "user_id"});
  snapchat.belongsTo(users, { as: "author_user", foreignKey: "author"});
  users.hasMany(snapchat, { as: "snapchats", foreignKey: "author"});

  return {
    articles,
    bans,
    categories,
    categories_articles,
    comments,
    config,
    logins,
    movies,
    permissions,
    rank,
    snapchat,
    subcategories,
    users,
  };
}
