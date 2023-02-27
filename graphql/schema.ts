import "./types/User";
import "./types/Solve";

import { builder } from "./builder";

export const schema = builder.toSchema();
