### 1.0
* dnd5e v4 comptible.
* requires foundry v12.
* Removed character sheet filter since all of the newever versions have it already.
  - Actor disposition colours works
  - Alternative Advantage works.
  - Ammor recovery works.
  - Ammo selector not required as is configurable in dnd5e rolls. (Just not as pretty).
  - Auto roll hit points updated for dnd5e v4 and summoned tokens.
  - Better scroll creation removed since in dnd5e v4 includes all of the required data.
  - Clean Rolls not required as dnd5e now does a fine job of dealing with extra pluses.
  - Collapsible inverntory sections works.
  - Containter Helper: Fix for removing dropped items when the item is a consumable.
  - Dynamic ring works
  - Item Rarity colours works.
  - Silent Initiative works.
  - Template Preview works.


### 0.40
* Incorporate change for not prompting to manually roll hit points when auto rolling unlinked token hit points.
* A few little clean-ups

### 0.39
* When remove items from source is set, deleting a container will no longer spew items into the inventory of the actor doing the deletion.
* Option to allow monster feature recharge to happen at the end of the monster's turn instead of the start of its next turn.
* Swapped colors for legendary/very-rare to match dnd5e standard.

### 0.38 skipped
### 0.37
* Fix for unlinked summoned creatures not rolling hp correctly when summoned via an item.

### 0.36
* Added option for dynamic ring color to match the actor's owner's color rather than a specified color.
* Fix for incorrectly overriding token settings for ring color in v11

### 0.35
* support token ring color/background in v11.

### 0.34
* Support choosing a token ring color/background color for auto ring enabling.
* Auto roll npc hit points now works in v12.
* Removed dependency on warpgate for token resizing.Turns

### 0.33
* Added feature to automatically enable dynamic token ring when a token is added to a scene.

### 0.32
* Process item subtypes for ammunition selector. The current solution using name will till work but throw a warning. Eventually it will be disabled.
* Fix a few compatibility warnings

### 0.31
* V12 compatibility release
* Option to remove items when dragged from an actor or world container to another actor/world container.
  - Supports Group Actors, NPCs and Characters, so you can use a Group Actor to hold party inventory then drag and drop it and have it removed from party inventory.
  - Option to remove items from World Containers when dropped to an actor.

### 0.30
* Fix for clean rolls and dnd5e v3.1.2

### 0.29
* Added putting a disposition colored dot next to the actor name in the actor directory.

### 0.28
* Fix for clean rolls

### 0.27
* Reinstate the item/spell/feture filter for dnd3.0 (only works for the legacy sheet).
* Increate the opacity of unprepared spells so they can still be seen.

### 0.26
* dnd3.0 compatibility changes.
* Backwards compatible with 2.4.1

### 0.25
* Ammo selector will only fire if the missile weapon has ammunition consumption specified
- Fix to the css to enable right click menus to work.

### 0.24
* Some tweaks so that scriptlets will load in sw5e. 
  * Auto roll hp has been tested and works in sw5e.
  * Clean rolls works.
  * Ammo selector does not know about weapon/ammo types for sw5e so won't work without changes
  * Ammo recovery works.
  * Feature recharge works.
  * Legendary Action recharge works.
  * Silent initiative works.
  * Token resizer works.
  * It seems that none of the sheet modifications work.

### 0.23
* Fix for sometimes not correctly triggering the item use after consuming the ammo in ammoSelector

### 0.22
* Added Gridded Gridless mode. When enabled will force all measure distance calculations to use the dnd5e distance calculation.

### 0.21
* Fix for wrong Hook signature in autoRollHP
* Fix for trying to rewrite effect origins when the actor is in a compendium.

### 0.20
* Added feature to improve scroll creation so that effects and flags from the original spell are included in the created scroll.
* Added option to roll hitpoints for unlinked actors without generating a chat message

### 0.19
* Fix origins for actors imported from Compendia where transfer effects point back to the compenidum.

### 0.18
* Fix for alternate advantage when configuring advantage manually and there is another source of advantage which does the advantage addition twice.
* Added fix for origins on Sidebar created items.

### 0.17
* Improved origin fixup and now also applied when creating a token. You can enable auto origin fixing or call it via the api
  - All effects on the actor/synthetic actor are examined and if replacing the actor reference in the origin with the newly created (synthetic) actor's uuid points to an existing object the updated origin is used instead.
  - This works for:
    passive effects (origin of the form ActorUuid.Item.Id), 
    actor effects (Origin of the form ActorUuid) 
    any non-transfer effects where the created actor has the item that created the effect. 
    Otherwise the origin is left untouched.
  - Will now correct origins when an unlinked  token teleoports to another scene which previously would not.
  - Will not correct non-transfer effects when teleporting to another scene.
  game.modules.get("dnd5e-scriptlets").api updated with
    - fixActorOrigins(Actor) - fix origins for the passed actor
    - fixTokenOrigins(Token | TokenDocument) - fix origins for the passed token or tokenDoucment
    - fixActorOriginsForAllActors() - fix origins for all world actors
    - fixTokenOriginsForScene(scene) - fir origins for all tokens in the passed scene,
    - fixTokenOriginsForActiveScene() - fix origins for the all tokens in the active scene,
    - fixTokenOriginsForAllScenes() - fix origins for all tokens in all scenes
    - If you have ATL active and a token on a scene which is not current requires updating ATL will throw an error (this affects fixTokenOriginsForScene and fixTokenOriginsForAllScenes).

### 0.16
* Fix the origins of actor effects (as best we can) when creating an actor.

### 0.15
* Support silent initiative rolls - if enabled initiative rolls are not reported to the chat log.
* Added support for Ready Set Roll in ammo selector.

### 0.14
* Fix for bogus error reported during initialisation

### 0.13
* Fix for token resizer bug introduced in 0.12

### 0.12
* Added simple ammo recovery - for a more complete solution use the excellent Ammo Recovery module.
* Auto executed at end of combat.
* Can be called per actor with globalThis.dnd5eScriptlets.restoreAmmoActor(actor), or globalThis.dnd5eScriptlets.restoreAmmoActors(). 
* Magical ammunition is not recovered but the amount consumed is recorded and displayed. Magical ammo must have the magic property set recovery to be disabled.

### 0.11
* Added Collapsible inventory sections for the default character sheet.

### 0.10.1
* Fix for alternative advantage not setting disadvantage correctly

### 0.10
* Added option to whisper recharge message to GM only.
* legendary actions are recharged when a combatant is added to the combat.
* items are recharged when a combatant is added to the combat.

### 0.9.1
* Fix for error being thrown in v10 when managing settings.

### 0.9
* Added "Alternative Advantage" which allows you to specify a roll formula to add/subtract to a roll for advantage/disadvantage instead of rolling 2 dice.
  - The roll is evaluated against the actor/items roll data so expressions like "1d4 + @abilities.str.mod" will work, or just a number like 2

### 0.8
* Allow item recharge to be silent or generate a chat message.

### 0.7
* Fix for not working in non-english environments

### 0.6 
* Size small now works as per RAW (i.e size 1 but scaled to look small)
* Major changes to tokenResizer - now can be configured by passing size data to the functions or altering globalThis.dnd5eScriptlets.API.tokenResizeData.
* Export queryResize(tokens: [Token], resizeData) 
* Export doResizeTokens(tokens: [Token], size: string, resizeData) size is a key into resizeData
* resize data is optional and if omitted defaults to globalThis.dnd5eScriptlets.API.tokenResizeData
### 0.5
* Export queryResize(tokens: [Token]) in globalThis.dnd5eScriptlets.API
* Export doResizeTokens(tokens: [Token], size: number) (0.25, 0.5, 1, 2, 4, 8)
### 0.4
* Added Clean Rolls, Item Recharge, Legendary Recharge, Token Resizer, Roll Unlinked Token HP.
* Clean rolls will remove the + + or + - from various dnd5e rolls.

### 0.3
* Fix for doing late targeting twice (if using midi-qol)
