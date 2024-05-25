import 'dotenv/config';

import { executeCommand } from './core/execute';
import { bindCommands } from './utils';
import { voxedClient } from './core';
import { registerClientEvents, registerGuildEvents } from './events';

registerClientEvents(voxedClient);
registerGuildEvents(voxedClient);

bindCommands(voxedClient);
executeCommand(voxedClient);

voxedClient.login(process.env.TOKEN);
