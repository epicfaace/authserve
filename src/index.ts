import {Command, flags} from '@oclif/command'
import * as path from "path";
import { createExpressApp } from "./server";

class Authserve extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print'}),
    // // flag with no value (-f, --force)
    // force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Authserve)

    // const name = flags.name ?? 'world'
    // this.log(`Welcome to authserve`);

    const configPath = path.resolve(process.cwd(), "authserve.config.js");
    const config = await import(configPath);
    if (config.serve.type !== "express") {
      this.error("Only express serve type is supported");
    }
    if (config.auth.type !== "github") {
      this.error("Only github auth type is supported");
    }
    const app = createExpressApp(config.auth, config.serve);
    app.listen(process.env.PORT || 8080);

    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }


  }
}

export = Authserve
