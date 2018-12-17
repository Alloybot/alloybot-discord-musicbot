import { default as Alloybot, Type, Util, ConfigBuilder } from '../../Alloybot';
import { EventEmitter } from 'events';

export default class Discord_Musicbot extends EventEmitter implements Type.IPlugin {
  public readonly name: string = 'Discord-Musicbot';
  public readonly dependencies: string[] = ['Commander', 'Discord', 'MongoDB'];
  public readonly dependants: Type.IPlugin[] = Alloybot.getDependants(this.name);
  public config;

  constructor() {
    super();
    let Config: ConfigBuilder = new ConfigBuilder('Discord-Musicbot', require('./package.json').version);
    Config.addOption('Name', ['string'], 'Name of the Musicbot');
    Config.close();
    this.config = Config.getConfig();
  }
}

Alloybot.registerPlugin(new Discord_Musicbot());
