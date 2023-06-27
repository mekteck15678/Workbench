import GObject from "gi://GObject";
// import Gtk from "gi://Gtk";
import Source from "gi://GtkSource";

// import { rangeEquals } from "./lsp/LSP.js";

class WorkbenchCompletionProvider extends GObject.Object {
  constructor() {
    super();
    // this.diagnostics = [];
  }

  vfunc_populate() {
    log("wow!");
    // try {
    //   const diagnostics = this.findDiagnostics(context);
    //   if (diagnostics.length < 1) return false;
    //   this.showDiagnostics(display, diagnostics);
    // } catch (err) {
    //   logError(err);
    //   return false;
    // }

    return true;
  }
}

export default GObject.registerClass(
  {
    GTypeName: "WorkbenchCompletionProvider",
    Implements: [Source.CompletionProvider],
  },
  WorkbenchCompletionProvider,
);
