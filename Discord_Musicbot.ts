import { default as Alloybot, IFace, Util, ConfigBuilder } from '../../Alloybot';

export default class Discord_Musicbot extends IFace.IPlugin {
  protected Name: string = 'Discord-Musicbot';
  protected Dependencies: string[] = ['Commander', 'Discord', 'MongoDB'];
  protected Dependants: IFace.IPlugin[] = Alloybot.getDependants(this.Name);
  protected Logger: Util.Logger = new Util.Logger(this.Name);
  protected Config;

  constructor() {
    super();
    let _config: ConfigBuilder = new ConfigBuilder('Discord-Musicbot', require('./package.json').version);
    _config.addOption('Name', ['string'], 'Name of the Musicbot');
    _config.close();
    this.Config = _config.getConfig();
  }
}

Alloybot.registerPlugin(new Discord_Musicbot());
