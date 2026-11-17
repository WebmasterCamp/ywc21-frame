import * as React from 'react';

/** Centred Thai section title with a tracked English label beneath. */
export interface SectionHeadingProps { th: React.ReactNode; en?: string; description?: React.ReactNode; align?: 'center' | 'start'; className?: string; }
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;

/** Call-to-action button. Intentional addition (not in the Figma source). */
export interface ButtonProps { variant?: 'primary' | 'ghost'; type?: 'button' | 'submit'; disabled?: boolean; onClick?: () => void; children: React.ReactNode; className?: string; }
export declare function Button(props: ButtonProps): JSX.Element;

/** Torn-edge parchment card ("ทำไมต้อง YWC21", Timeline entries). */
export interface ParchmentCardProps { number?: React.ReactNode; title?: React.ReactNode; children?: React.ReactNode; width?: number | string; seed?: number; className?: string; }
export declare function ParchmentCard(props: ParchmentCardProps): JSX.Element;

/** Navy-to-gold gradient tile for choosing a camp major. */
export interface MajorTileProps { th: React.ReactNode; en?: string; selected?: boolean; onClick?: () => void; className?: string; }
export declare function MajorTile(props: MajorTileProps): JSX.Element;

/** Band of the word "human" in many scripts, drifting slowly. */
export interface ScriptMarqueeProps { words?: string[]; duration?: number; reverse?: boolean; label?: string; className?: string; }
export declare function ScriptMarquee(props: ScriptMarqueeProps): JSX.Element;

/** Diamond-shaped carousel indicator. */
export interface DiamondDotsProps { count?: number; active: number; onChange?: (index: number) => void; label?: string; className?: string; }
export declare function DiamondDots(props: DiamondDotsProps): JSX.Element;
