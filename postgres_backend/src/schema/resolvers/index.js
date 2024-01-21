import merge from "lodash.merge";
import userResolvers from "./user";

module.export.resolvers = merge({}, userResolvers);
