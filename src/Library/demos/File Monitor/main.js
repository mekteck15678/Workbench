import Gtk from "gi://Gtk";
import Gio from "gi://Gio";
import Adw from "gi://Adw";
import GLib from "gi://GLib";

Gio._promisify(Gtk.FileLauncher.prototype, "launch", "launch_finish");

const edit_entry = workbench.builder.get_object("edit_entry");
const view_file = workbench.builder.get_object("view_file");
const create_file = workbench.builder.get_object("create_file");
const delete_file = workbench.builder.get_object("delete_file");
const edit_file = workbench.builder.get_object("edit_file");
const file_name = workbench.builder.get_object("file_name");
const { buffer } = edit_entry;
const file = Gio.File.new_for_path(pkg.pkgdatadir).resolve_relative_path(
  "Library/demos/File Monitor/workbench.txt",
);
const file_dir = file.get_parent();
const file_launcher = new Gtk.FileLauncher({
  always_ask: true,
  file,
});
const monitor_for_dir = file.monitor(Gio.FileMonitorFlags.NONE, null);
const monitor_for_file = file.monitor(Gio.FileMonitorFlags.NONE, null);
const overlay = workbench.builder.get_object("overlay");
const details = file.query_info(
  "standard::display-name",
  Gio.FileQueryInfoFlags.NONE,
  null,
);
file_name.label = details.get_display_name();
buffer.set_text("Start editing ... ", -1);
delete_file.connect("clicked", () => {
  file.delete_async(GLib.PRIORITY_DEFAULT, null).catch(logError);
});
create_file.connect("clicked", () => {
  const new_file = Gio.File.new_for_path("test-file.txt");
  new_file.create(Gio.FileCreateFlags.NONE, null);
});
view_file.connect("clicked", () => {
  file_launcher.launch(workbench.window, null).catch(logError);
});
monitor_for_file.connect("changed", () => {
  const toast = new Adw.Toast({
    title: "File modified",
    timeout: 2,
  });
  overlay.add_toast(toast);
});
monitor_for_dir.connect("changed", () => {
  const toast = new Adw.Toast({
    title: "Directory Modified",
    timeout: 2,
  });
  overlay.add_toast(toast);
});

edit_file.connect("clicked", () => {
  const text = buffer.get_text(
    buffer.get_start_iter(),
    buffer.get_end_iter(),
    true,
  );
  const bytes = new GLib.Bytes(text);
  file
    .replace_contents_async(
      bytes,
      null,
      false,
      Gio.FileCreateFlags.REPLACE_DESTINATION,
      null,
      null,
    )
    .catch(logError);
});