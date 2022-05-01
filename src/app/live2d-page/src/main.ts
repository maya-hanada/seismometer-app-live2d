/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * ブラウザロード後の処理
 */
export function loading_live2d(): void {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }
  LAppDelegate.getInstance().run();
}

/**
 * 終了時の処理
 */
export function dispose_live2d(): void {
  LAppDelegate.releaseInstance();
}

/**
 * Process when changing screen size.
 */
export function onresize_live2d(): void {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
}

/**
 * Process when changing motion.
 */
export function changeMotion_live2d(no: number): void {
  LAppDelegate.getInstance().changeMotion(no);
}
