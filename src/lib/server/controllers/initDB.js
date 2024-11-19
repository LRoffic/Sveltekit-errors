import { dev } from '$app/environment';
import { Sequelize } from "sequelize";

import initModels from "$lib/server/models/init-models";
import config from "$config/db_config.json";

const env = dev ? "development" : "production";

let sequelize = new Sequelize(config[env].database,config[env].username,config[env].password, config[env]);

let db = initModels(sequelize);

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db;