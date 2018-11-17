import { IModule, Alloybot } from '../../../Alloybot';
import { EventEmitter } from 'events';

export class Discord_Musicbot extends EventEmitter implements IModule {
  public readonly name: String = 'Discord-Musicbot';
  public readonly dependencies: String[] = ['Commander', 'Discord', 'MongoDB'];

  constructor() {
    super();
  }
}

Alloybot.registerModule(new Discord_Musicbot());
