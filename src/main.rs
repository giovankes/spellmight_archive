// paths
#[path = "components/menu/menu.rs"]
// mods
mod menu;

//modules
use bevy::prelude::*;

//states
#[derive(Debug, Clone, Eq, PartialEq, Hash)]
enum AppState {
    MainMenu,
    InGame,
    Paused,
}

fn main() {
    App::build().add_plugins(DefaultPlugins).run();
}
