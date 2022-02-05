use crate::loading::FontAssets;
use crate::GameState;
use bevy::prelude::*;

pub struct MenuPlugin;

/// This plugin is responsible for the game menu (containing only one button...)
/// The menu is only drawn during the State `GameState::Menu` and is removed when that state is exited
impl Plugin for MenuPlugin {
    fn build(&self, app: &mut App) {
        app.init_resource::<ButtonColors>()
            .add_system_set(SystemSet::on_enter(GameState::Menu).with_system(setup_menu.system()))
            .add_system_set(
                SystemSet::on_update(GameState::Menu).with_system(click_play_button.system()),
            );
    }
}

struct ButtonColors {
    normal: UiColor,
    hovered: UiColor,
}

struct TextColors {
    normal: UiColor,
    hovered: UiColor,
}

impl Default for ButtonColors {
    fn default() -> Self {
        ButtonColors {
            normal: Color::rgb(0.15, 0.15, 0.15).into(),
            hovered: Color::rgb(0.25, 0.25, 0.25).into(),
        }
    }
}

impl Default for TextColors {
    fn default() -> Self {
        TextColors {
            normal: Color::rgb(0.15, 0.15, 0.15).into(),
            hovered: Color::rgb(0.25, 0.2, 0.25).into(),
        }
    }
}

#[derive(Component)]
struct PlayButton;

fn setup_menu(
    mut commands: Commands,
    font_assets: Res<FontAssets>,
    button_colors: Res<ButtonColors>,
) {
    commands.spawn_bundle(UiCameraBundle::default());
    commands.spawn_bundle(TextBundle {
        style: Style {
            size: Size::new(Val::Px(120.0), Val::Px(50.0)),
            position_type: PositionType::Absolute,
            margin: Rect {
                bottom: Val::Percent(75.0),
                left: Val::Percent(40.0),
                ..Default::default()
            },
            position: Rect {
                left: Val::Px(45.0),
                top: Val::Px(5.0),
                right: Val::Px(20.0),
                bottom: Val::Px(0.0),
            },
            ..Default::default()
        },
        text: Text {
            sections: vec![TextSection {
                value: "spellmight".to_string(),
                style: TextStyle {
                    font: font_assets.fira_sans.clone(),
                    font_size: 40.0,
                    color: Color::rgb(0.9, 0.9, 0.9),
                    ..Default::default()
                },
            }],
            ..Default::default()
        },
        ..Default::default()
    });
    commands
        .spawn_bundle(ButtonBundle {
            style: Style {
                position_type: PositionType::Absolute,
                size: Size::new(Val::Px(120.0), Val::Px(50.0)),
                margin: Rect::all(Val::Px(50.0)),
                position: Rect {
                    left: Val::Percent(42.0),
                    top: Val::Percent(0.0),
                    right: Val::Px(0.0),
                    bottom: Val::Percent(20.0),
                },
                ..Default::default()
            },
            color: button_colors.normal.clone(),
            ..Default::default()
        })
        .insert(PlayButton)
        .with_children(|parent| {
            parent.spawn_bundle(TextBundle {
                text: Text {
                    sections: vec![TextSection {
                        value: "singleplayer".to_string(),
                        style: TextStyle {
                            font: font_assets.fira_sans.clone(),
                            font_size: 40.0,
                            color: Color::rgb(0.9, 0.9, 0.9),
                        },
                    }],
                    alignment: Default::default(),
                },
                ..Default::default()
            });
        });
}

type ButtonInteraction<'a> = (Entity, &'a Interaction, &'a mut UiColor, &'a Children);
fn click_play_button(
    mut commands: Commands,
    button_colors: Res<ButtonColors>,
    mut state: ResMut<State<GameState>>,
    mut interaction_query: Query<ButtonInteraction, (Changed<Interaction>, With<Button>)>,
    mut text_query: Query<Entity, With<Text>>,
) {
    for (button, interaction, mut color, children) in interaction_query.iter_mut() {
        match *interaction {
            Interaction::Clicked => {
                commands.entity(button).despawn();
                for (text) in text_query.iter_mut() {
                    commands.entity(text).despawn();
                }
                state.set(GameState::Playing).unwrap();
            }
            Interaction::Hovered => {
                *color = button_colors.hovered.clone();
            }
            Interaction::None => {
                *color = button_colors.normal.clone();
            }
        }
    }
}
