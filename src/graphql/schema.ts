import "./types/User";
import "./types/Solve";
import "./types/SolveSession";

import { builder } from "./builder";

export const schema = builder.toSchema();
