
/* IMPORT */

import type { JSX as JSXInternal } from "./types";

/* GLOBALS */

declare global {
  namespace JSX {
    type ArrayMaybe = JSXInternal.ArrayMaybe
    type FunctionMaybe = JSXInternal.FunctionMaybe
    type ObservableMaybe = JSXInternal.ObservableMaybe
    type Nullable = JSXInternal.Nullable
    type AllClassProperties = JSXInternal.AllClassProperties
    type DOMCSSProperties = JSXInternal.DOMCSSProperties
    type DOMCSSVariables = JSXInternal.DOMCSSVariables
    type HTMLAttributeReferrerPolicy = JSXInternal.HTMLAttributeReferrerPolicy
    type Child = JSXInternal.Child
    type Children = JSXInternal.Children
    type Class = JSXInternal.Class
    type Component = JSXInternal.Component
    type Element = JSXInternal.Element
    type Ref = JSXInternal.Ref
    type Refs = JSXInternal.Refs
    type Style = JSXInternal.Style
    type IntrinsicElement<T extends keyof JSXInternal.IntrinsicElements> = JSXInternal.IntrinsicElement<T>
    interface ClassProperties extends JSXInternal.ClassProperties { }
    interface StyleProperties extends JSXInternal.StyleProperties { }
    type TargetedEvent = JSXInternal.TargetedEvent
    type TargetedAnimationEvent<T extends EventTarget> = JSXInternal.TargetedAnimationEvent<T>
    type TargetedClipboardEvent<T extends EventTarget> = JSXInternal.TargetedClipboardEvent<T>
    type TargetedCompositionEvent<T extends EventTarget> = JSXInternal.TargetedCompositionEvent<T>
    type TargetedDragEvent<T extends EventTarget> = JSXInternal.TargetedDragEvent<T>
    type TargetedFocusEvent<T extends EventTarget> = JSXInternal.TargetedFocusEvent<T>
    type TargetedInputEvent<T extends EventTarget> = JSXInternal.TargetedInputEvent<T>
    type TargetedKeyboardEvent<T extends EventTarget> = JSXInternal.TargetedKeyboardEvent<T>
    type TargetedMouseEvent<T extends EventTarget> = JSXInternal.TargetedMouseEvent<T>
    type TargetedPointerEvent<T extends EventTarget> = JSXInternal.TargetedPointerEvent<T>
    type TargetedSubmitEvent<T extends EventTarget> = JSXInternal.TargetedSubmitEvent<T>
    type TargetedTouchEvent<T extends EventTarget> = JSXInternal.TargetedTouchEvent<T>
    type TargetedTransitionEvent<T extends EventTarget> = JSXInternal.TargetedTransitionEvent<T>
    type TargetedUIEvent<T extends EventTarget> = JSXInternal.TargetedUIEvent<T>
    type TargetedWheelEvent<T extends EventTarget> = JSXInternal.TargetedWheelEvent<T>
    type EventHandler<T extends JSXInternal.TargetedEvent> = JSXInternal.EventHandler<T>
    type AnimationEventHandler<T extends EventTarget> = JSXInternal.AnimationEventHandler<T>
    type ClipboardEventHandler<T extends EventTarget> = JSXInternal.ClipboardEventHandler<T>
    type CompositionEventHandler<T extends EventTarget> = JSXInternal.CompositionEventHandler<T>
    type DragEventHandler<T extends EventTarget> = JSXInternal.DragEventHandler<T>
    type FocusEventHandler<T extends EventTarget> = JSXInternal.FocusEventHandler<T>
    type GenericEventHandler<T extends EventTarget> = JSXInternal.GenericEventHandler<T>
    type InputEventHandler<T extends EventTarget> = JSXInternal.InputEventHandler<T>
    type KeyboardEventHandler<T extends EventTarget> = JSXInternal.KeyboardEventHandler<T>
    type MouseEventHandler<T extends EventTarget> = JSXInternal.MouseEventHandler<T>
    type PointerEventHandler<T extends EventTarget> = JSXInternal.PointerEventHandler<T>
    type SubmitEventHandler<T extends EventTarget> = JSXInternal.SubmitEventHandler<T>
    type TouchEventHandler<T extends EventTarget> = JSXInternal.TouchEventHandler<T>
    type TransitionEventHandler<T extends EventTarget> = JSXInternal.TransitionEventHandler<T>
    type UIEventHandler<T extends EventTarget> = JSXInternal.UIEventHandler<T>
    type WheelEventHandler<T extends EventTarget> = JSXInternal.WheelEventHandler<T>
    interface ElementAttributesProperty extends JSXInternal.ElementAttributesProperty { }
    interface ElementChildrenAttribute extends JSXInternal.ElementChildrenAttribute { }
    interface IntrinsicAttributes extends JSXInternal.IntrinsicAttributes { }
    interface AriaAttributes extends JSXInternal.AriaAttributes { }
    interface Directives extends JSXInternal.Directives { }
    type DirectiveAttributes = JSXInternal.DirectiveAttributes
    interface EventAttributes<T extends EventTarget> extends JSXInternal.EventAttributes<T> { }
    interface ViewAttributes extends JSXInternal.ViewAttributes { }
    interface DOMAttributes<T extends EventTarget> extends JSXInternal.DOMAttributes<T> { }
    interface VoidHTMLAttributes<T extends EventTarget> extends JSXInternal.VoidHTMLAttributes<T> { }
    interface HTMLAttributes<T extends EventTarget> extends JSXInternal.HTMLAttributes<T> { }
    interface SVGAttributes<T extends EventTarget> extends JSXInternal.SVGAttributes<T> { }
    interface AnchorHTMLAttributes<T extends EventTarget> extends JSXInternal.AnchorHTMLAttributes<T> { }
    interface AudioHTMLAttributes<T extends EventTarget> extends JSXInternal.AudioHTMLAttributes<T> { }
    interface AreaHTMLAttributes<T extends EventTarget> extends JSXInternal.AreaHTMLAttributes<T> { }
    interface BaseHTMLAttributes<T extends EventTarget> extends JSXInternal.BaseHTMLAttributes<T> { }
    interface BlockquoteHTMLAttributes<T extends EventTarget> extends JSXInternal.BlockquoteHTMLAttributes<T> { }
    interface BrHTMLAttributes<T extends EventTarget> extends JSXInternal.BrHTMLAttributes<T> { }
    interface ButtonHTMLAttributes<T extends EventTarget> extends JSXInternal.ButtonHTMLAttributes<T> { }
    interface CanvasHTMLAttributes<T extends EventTarget> extends JSXInternal.CanvasHTMLAttributes<T> { }
    interface ColHTMLAttributes<T extends EventTarget> extends JSXInternal.ColHTMLAttributes<T> { }
    interface ColgroupHTMLAttributes<T extends EventTarget> extends JSXInternal.ColgroupHTMLAttributes<T> { }
    interface DataHTMLAttributes<T extends EventTarget> extends JSXInternal.DataHTMLAttributes<T> { }
    interface DetailsHTMLAttributes<T extends EventTarget> extends JSXInternal.DetailsHTMLAttributes<T> { }
    interface DelHTMLAttributes<T extends EventTarget> extends JSXInternal.DelHTMLAttributes<T> { }
    interface DialogHTMLAttributes<T extends EventTarget> extends JSXInternal.DialogHTMLAttributes<T> { }
    interface EmbedHTMLAttributes<T extends EventTarget> extends JSXInternal.EmbedHTMLAttributes<T> { }
    interface FieldsetHTMLAttributes<T extends EventTarget> extends JSXInternal.FieldsetHTMLAttributes<T> { }
    interface FormHTMLAttributes<T extends EventTarget> extends JSXInternal.FormHTMLAttributes<T> { }
    interface HrHTMLAttributes<T extends EventTarget> extends JSXInternal.HrHTMLAttributes<T> { }
    interface HtmlHTMLAttributes<T extends EventTarget> extends JSXInternal.HtmlHTMLAttributes<T> { }
    interface IframeHTMLAttributes<T extends EventTarget> extends JSXInternal.IframeHTMLAttributes<T> { }
    interface ImgHTMLAttributes<T extends EventTarget> extends JSXInternal.ImgHTMLAttributes<T> { }
    interface InsHTMLAttributes<T extends EventTarget> extends JSXInternal.InsHTMLAttributes<T> { }
    interface InputHTMLAttributes<T extends EventTarget> extends JSXInternal.InputHTMLAttributes<T> { }
    interface KeygenHTMLAttributes<T extends EventTarget> extends JSXInternal.KeygenHTMLAttributes<T> { }
    interface LabelHTMLAttributes<T extends EventTarget> extends JSXInternal.LabelHTMLAttributes<T> { }
    interface LiHTMLAttributes<T extends EventTarget> extends JSXInternal.LiHTMLAttributes<T> { }
    interface LinkHTMLAttributes<T extends EventTarget> extends JSXInternal.LinkHTMLAttributes<T> { }
    interface MapHTMLAttributes<T extends EventTarget> extends JSXInternal.MapHTMLAttributes<T> { }
    interface MenuHTMLAttributes<T extends EventTarget> extends JSXInternal.MenuHTMLAttributes<T> { }
    interface MediaHTMLAttributes<T extends EventTarget> extends JSXInternal.MediaHTMLAttributes<T> { }
    interface MetaHTMLAttributes<T extends EventTarget> extends JSXInternal.MetaHTMLAttributes<T> { }
    interface MeterHTMLAttributes<T extends EventTarget> extends JSXInternal.MeterHTMLAttributes<T> { }
    interface QuoteHTMLAttributes<T extends EventTarget> extends JSXInternal.QuoteHTMLAttributes<T> { }
    interface ObjectHTMLAttributes<T extends EventTarget> extends JSXInternal.ObjectHTMLAttributes<T> { }
    interface OlHTMLAttributes<T extends EventTarget> extends JSXInternal.OlHTMLAttributes<T> { }
    interface OptgroupHTMLAttributes<T extends EventTarget> extends JSXInternal.OptgroupHTMLAttributes<T> { }
    interface OptionHTMLAttributes<T extends EventTarget> extends JSXInternal.OptionHTMLAttributes<T> { }
    interface OutputHTMLAttributes<T extends EventTarget> extends JSXInternal.OutputHTMLAttributes<T> { }
    interface ParamHTMLAttributes<T extends EventTarget> extends JSXInternal.ParamHTMLAttributes<T> { }
    interface ProgressHTMLAttributes<T extends EventTarget> extends JSXInternal.ProgressHTMLAttributes<T> { }
    interface SlotHTMLAttributes<T extends EventTarget> extends JSXInternal.SlotHTMLAttributes<T> { }
    interface ScriptHTMLAttributes<T extends EventTarget> extends JSXInternal.ScriptHTMLAttributes<T> { }
    interface SelectHTMLAttributes<T extends EventTarget> extends JSXInternal.SelectHTMLAttributes<T> { }
    interface SourceHTMLAttributes<T extends EventTarget> extends JSXInternal.SourceHTMLAttributes<T> { }
    interface StyleHTMLAttributes<T extends EventTarget> extends JSXInternal.StyleHTMLAttributes<T> { }
    interface TableHTMLAttributes<T extends EventTarget> extends JSXInternal.TableHTMLAttributes<T> { }
    interface TextareaHTMLAttributes<T extends EventTarget> extends JSXInternal.TextareaHTMLAttributes<T> { }
    interface TdHTMLAttributes<T extends EventTarget> extends JSXInternal.TdHTMLAttributes<T> { }
    interface ThHTMLAttributes<T extends EventTarget> extends JSXInternal.ThHTMLAttributes<T> { }
    interface TimeHTMLAttributes<T extends EventTarget> extends JSXInternal.TimeHTMLAttributes<T> { }
    interface TrackHTMLAttributes<T extends EventTarget> extends JSXInternal.TrackHTMLAttributes<T> { }
    interface VideoHTMLAttributes<T extends EventTarget> extends JSXInternal.VideoHTMLAttributes<T> { }
    interface WbrHTMLAttributes<T extends EventTarget> extends JSXInternal.WbrHTMLAttributes<T> { }
    interface WebViewHTMLAttributes<T extends EventTarget> extends JSXInternal.WebViewHTMLAttributes<T> { }
    interface IntrinsicElementsMap extends JSXInternal.IntrinsicElementsMap { }
    interface IntrinsicElements extends JSXInternal.IntrinsicElements { }
  }
}
