#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
//modules
use bevy::prelude::{App, ClearColor, Color, Msaa, WindowDescriptor};
use bevy::DefaultPlugins;
use spellmight::GamePlugin;

//states
#[derive(Debug, Clone, Eq, PartialEq, Hash)]
enum AppState {
    MainMenu,
    InGame,
    Paused,
}

fn main() {
    App::new()
        .insert_resource(Msaa { samples: 1 })
        .insert_resource(ClearColor(Color::rgb(0.4, 0.4, 0.4)))
        .insert_resource(WindowDescriptor {
            width: 800.,
            height: 600.,
            title: "spellmight".to_string(),
            ..Default::default()
        })
        .add_plugins(DefaultPlugins)
        .add_plugin(GamePlugin)
        .run();
}
