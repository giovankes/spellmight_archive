use crate::loading::FontAssets;
use crate::GameState;

pub struct ChooseCharacterPlugin;

impl Plugin for ChooseCharacterPlugin {
    fn build(&self, app: &mut App) {
        app.init_resource::<TextColors>().add_system_set(
            SystemSet::on_enter(GameState::ChooseCharacter).with_system(setup_screen.system()),
        );
    }
}

struct TextColor {
    normal: UiColor,
}

impl Default for TextColors {
    fn default() -> Self {
        TextColors {
            normal: Color::rgb(0.15, 0.15, 0.15).into(),
        }
    }
}

fn setup_screen(mut commands: Commands, font_assets: Res<FontAssets>) {
    commands.spawn_bundle(UiCameraBundle::default());
    commands.spawn_bundle(TextBundle {
        style: Style {
            size: Size::new(Val::px(120.0), Val::Px(50.0)),
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
                value: "choose your character".to_string(),
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
}
