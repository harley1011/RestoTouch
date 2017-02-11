import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */


export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
     this.APP_TITLE = 'RestoTouch';

     this.ENABLE_SCSS = 'true';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'font-awesome/css/font-awesome.css', inject: true }
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    this.FONTS_DEST = `${this.APP_DEST}/fonts`;


    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      //{src: `${this.ASSETS_SRC}/sass/app.css`, inject: true, vendor: false}
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    let additionalPackages: ExtendPackages[] = [
      // required for dev build
      {
        name:'ng2-bootstrap',
        path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },

      // required for prod build
      {
        name:'ng2-bootstrap/*',
        path:'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js'
      },

      // mandatory dependency for ng2-bootstrap datepicker
      {
        name:'moment',
        path:'node_modules/moment',
        packageMeta:{
          main: 'moment.js',
          defaultExtension: 'js'
        }
      },

      {
        name: 'socket.io-client',
        path: 'node_modules/socket.io-client/dist',
        packageMeta: {
          main: 'socket.io.min.js',
          defaultExtension: 'js'
        }
      }
    ];
    this.addPackagesBundles(additionalPackages);
  }

}
