import * as tslib_1 from "tslib";
import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { appInitialize } from './app-initialize';
import { BooleanValueAccessor } from './directives/control-value-accessors/boolean-value-accessor';
import { NumericValueAccessor } from './directives/control-value-accessors/numeric-value-accesssor';
import { RadioValueAccessor } from './directives/control-value-accessors/radio-value-accessor';
import { SelectValueAccessor } from './directives/control-value-accessors/select-value-accessor';
import { TextValueAccessor } from './directives/control-value-accessors/text-value-accessor';
import { IonBackButtonDelegate } from './directives/navigation/ion-back-button';
import { IonRouterOutlet } from './directives/navigation/ion-router-outlet';
import { IonTabs } from './directives/navigation/ion-tabs';
import { NavDelegate } from './directives/navigation/nav-delegate';
import { RouterLinkDelegate } from './directives/navigation/router-link-delegate';
import { IonApp, IonAvatar, IonBackButton, IonBackdrop, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCheckbox, IonChip, IonCol, IonContent, IonDatetime, IonFab, IonFabButton, IonFabList, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonMenu, IonMenuButton, IonMenuToggle, IonNav, IonNavLink, IonNote, IonProgressBar, IonRadio, IonRadioGroup, IonRange, IonRefresher, IonRefresherContent, IonReorder, IonReorderGroup, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSkeletonText, IonSlide, IonSlides, IonSpinner, IonSplitPane, IonTabBar, IonTabButton, IonText, IonTextarea, IonThumbnail, IonTitle, IonToggle, IonToolbar } from './directives/proxies';
import { VirtualFooter } from './directives/virtual-scroll/virtual-footer';
import { VirtualHeader } from './directives/virtual-scroll/virtual-header';
import { VirtualItem } from './directives/virtual-scroll/virtual-item';
import { IonVirtualScroll } from './directives/virtual-scroll/virtual-scroll';
import { AngularDelegate } from './providers/angular-delegate';
import { ConfigToken } from './providers/config';
import { ModalController } from './providers/modal-controller';
import { PopoverController } from './providers/popover-controller';
var DECLARATIONS = [
    // proxies
    IonApp,
    IonAvatar,
    IonBackButton,
    IonBackdrop,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonCol,
    IonContent,
    IonDatetime,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonNav,
    IonNavLink,
    IonNote,
    IonProgressBar,
    IonRadio,
    IonRadioGroup,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonReorder,
    IonReorderGroup,
    IonRippleEffect,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    IonSlide,
    IonSlides,
    IonSpinner,
    IonSplitPane,
    IonTabBar,
    IonTabButton,
    IonText,
    IonTextarea,
    IonThumbnail,
    IonToggle,
    IonToolbar,
    IonTitle,
    IonTabs,
    // ngModel accessors
    BooleanValueAccessor,
    NumericValueAccessor,
    RadioValueAccessor,
    SelectValueAccessor,
    TextValueAccessor,
    // navigation
    IonRouterOutlet,
    IonBackButtonDelegate,
    NavDelegate,
    RouterLinkDelegate,
    // virtual scroll
    VirtualFooter,
    VirtualHeader,
    VirtualItem,
    IonVirtualScroll
];
var IonicModule = /** @class */ (function () {
    function IonicModule() {
    }
    IonicModule_1 = IonicModule;
    IonicModule.forRoot = function (config) {
        return {
            ngModule: IonicModule_1,
            providers: [
                {
                    provide: ConfigToken,
                    useValue: config
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [
                        ConfigToken,
                        DOCUMENT,
                        NgZone
                    ]
                }
            ]
        };
    };
    var IonicModule_1;
    IonicModule = IonicModule_1 = tslib_1.__decorate([
        NgModule({
            declarations: DECLARATIONS,
            exports: DECLARATIONS,
            providers: [AngularDelegate, ModalController, PopoverController],
            imports: [CommonModule]
        })
    ], IonicModule);
    return IonicModule;
}());
export { IonicModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlvbmljL2FuZ3VsYXIvIiwic291cmNlcyI6WyJpb25pYy1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDbkcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDcEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDL0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDakcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDN0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzM2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVuRSxJQUFNLFlBQVksR0FBRztJQUNuQixVQUFVO0lBQ1YsTUFBTTtJQUNOLFNBQVM7SUFDVCxhQUFhO0lBQ2IsV0FBVztJQUNYLFFBQVE7SUFDUixTQUFTO0lBQ1QsVUFBVTtJQUNWLE9BQU87SUFDUCxjQUFjO0lBQ2QsYUFBYTtJQUNiLGVBQWU7SUFDZixZQUFZO0lBQ1osV0FBVztJQUNYLE9BQU87SUFDUCxNQUFNO0lBQ04sVUFBVTtJQUNWLFdBQVc7SUFDWCxNQUFNO0lBQ04sWUFBWTtJQUNaLFVBQVU7SUFDVixTQUFTO0lBQ1QsT0FBTztJQUNQLFNBQVM7SUFDVCxPQUFPO0lBQ1AsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQix3QkFBd0I7SUFDeEIsUUFBUTtJQUNSLE9BQU87SUFDUCxjQUFjO0lBQ2QsWUFBWTtJQUNaLGFBQWE7SUFDYixjQUFjO0lBQ2QsY0FBYztJQUNkLFFBQVE7SUFDUixPQUFPO0lBQ1AsYUFBYTtJQUNiLE9BQU87SUFDUCxhQUFhO0lBQ2IsYUFBYTtJQUNiLE1BQU07SUFDTixVQUFVO0lBQ1YsT0FBTztJQUNQLGNBQWM7SUFDZCxRQUFRO0lBQ1IsYUFBYTtJQUNiLFFBQVE7SUFDUixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixlQUFlO0lBQ2YsZUFBZTtJQUNmLE1BQU07SUFDTixZQUFZO0lBQ1osVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsZUFBZTtJQUNmLGVBQWU7SUFDZixRQUFRO0lBQ1IsU0FBUztJQUNULFVBQVU7SUFDVixZQUFZO0lBQ1osU0FBUztJQUNULFlBQVk7SUFDWixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsVUFBVTtJQUNWLFFBQVE7SUFFUixPQUFPO0lBRVAsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFFakIsYUFBYTtJQUNiLGVBQWU7SUFDZixxQkFBcUI7SUFDckIsV0FBVztJQUNYLGtCQUFrQjtJQUVsQixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLGFBQWE7SUFDYixXQUFXO0lBQ1gsZ0JBQWdCO0NBQ2pCLENBQUM7QUFRRjtJQUFBO0lBc0JBLENBQUM7b0JBdEJZLFdBQVc7SUFDZixtQkFBTyxHQUFkLFVBQWUsTUFBb0I7UUFDakMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFXO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLEVBQUUsYUFBYTtvQkFDekIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFO3dCQUNKLFdBQVc7d0JBQ1gsUUFBUTt3QkFDUixNQUFNO3FCQUNQO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFyQlUsV0FBVztRQU52QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsWUFBWTtZQUMxQixPQUFPLEVBQUUsWUFBWTtZQUNyQixTQUFTLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixDQUFDO1lBQ2hFLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN4QixDQUFDO09BQ1csV0FBVyxDQXNCdkI7SUFBRCxrQkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElvbmljQ29uZmlnIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgYXBwSW5pdGlhbGl6ZSB9IGZyb20gJy4vYXBwLWluaXRpYWxpemUnO1xyXG5pbXBvcnQgeyBCb29sZWFuVmFsdWVBY2Nlc3NvciB9IGZyb20gJy4vZGlyZWN0aXZlcy9jb250cm9sLXZhbHVlLWFjY2Vzc29ycy9ib29sZWFuLXZhbHVlLWFjY2Vzc29yJztcclxuaW1wb3J0IHsgTnVtZXJpY1ZhbHVlQWNjZXNzb3IgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvbnVtZXJpYy12YWx1ZS1hY2Nlc3Nzb3InO1xyXG5pbXBvcnQgeyBSYWRpb1ZhbHVlQWNjZXNzb3IgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY29udHJvbC12YWx1ZS1hY2Nlc3NvcnMvcmFkaW8tdmFsdWUtYWNjZXNzb3InO1xyXG5pbXBvcnQgeyBTZWxlY3RWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL3NlbGVjdC12YWx1ZS1hY2Nlc3Nvcic7XHJcbmltcG9ydCB7IFRleHRWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2wtdmFsdWUtYWNjZXNzb3JzL3RleHQtdmFsdWUtYWNjZXNzb3InO1xyXG5pbXBvcnQgeyBJb25CYWNrQnV0dG9uRGVsZWdhdGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tYmFjay1idXR0b24nO1xyXG5pbXBvcnQgeyBJb25Sb3V0ZXJPdXRsZXQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tcm91dGVyLW91dGxldCc7XHJcbmltcG9ydCB7IElvblRhYnMgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmF2aWdhdGlvbi9pb24tdGFicyc7XHJcbmltcG9ydCB7IE5hdkRlbGVnYXRlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vbmF2LWRlbGVnYXRlJztcclxuaW1wb3J0IHsgUm91dGVyTGlua0RlbGVnYXRlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25hdmlnYXRpb24vcm91dGVyLWxpbmstZGVsZWdhdGUnO1xyXG5pbXBvcnQgeyBJb25BcHAsIElvbkF2YXRhciwgSW9uQmFja0J1dHRvbiwgSW9uQmFja2Ryb3AsIElvbkJhZGdlLCBJb25CdXR0b24sIElvbkJ1dHRvbnMsIElvbkNhcmQsIElvbkNhcmRDb250ZW50LCBJb25DYXJkSGVhZGVyLCBJb25DYXJkU3VidGl0bGUsIElvbkNhcmRUaXRsZSwgSW9uQ2hlY2tib3gsIElvbkNoaXAsIElvbkNvbCwgSW9uQ29udGVudCwgSW9uRGF0ZXRpbWUsIElvbkZhYiwgSW9uRmFiQnV0dG9uLCBJb25GYWJMaXN0LCBJb25Gb290ZXIsIElvbkdyaWQsIElvbkhlYWRlciwgSW9uSWNvbiwgSW9uSW1nLCBJb25JbmZpbml0ZVNjcm9sbCwgSW9uSW5maW5pdGVTY3JvbGxDb250ZW50LCBJb25JbnB1dCwgSW9uSXRlbSwgSW9uSXRlbURpdmlkZXIsIElvbkl0ZW1Hcm91cCwgSW9uSXRlbU9wdGlvbiwgSW9uSXRlbU9wdGlvbnMsIElvbkl0ZW1TbGlkaW5nLCBJb25MYWJlbCwgSW9uTGlzdCwgSW9uTGlzdEhlYWRlciwgSW9uTWVudSwgSW9uTWVudUJ1dHRvbiwgSW9uTWVudVRvZ2dsZSwgSW9uTmF2LCBJb25OYXZMaW5rLCBJb25Ob3RlLCBJb25Qcm9ncmVzc0JhciwgSW9uUmFkaW8sIElvblJhZGlvR3JvdXAsIElvblJhbmdlLCBJb25SZWZyZXNoZXIsIElvblJlZnJlc2hlckNvbnRlbnQsIElvblJlb3JkZXIsIElvblJlb3JkZXJHcm91cCwgSW9uUmlwcGxlRWZmZWN0LCBJb25Sb3csIElvblNlYXJjaGJhciwgSW9uU2VnbWVudCwgSW9uU2VnbWVudEJ1dHRvbiwgSW9uU2VsZWN0LCBJb25TZWxlY3RPcHRpb24sIElvblNrZWxldG9uVGV4dCwgSW9uU2xpZGUsIElvblNsaWRlcywgSW9uU3Bpbm5lciwgSW9uU3BsaXRQYW5lLCBJb25UYWJCYXIsIElvblRhYkJ1dHRvbiwgSW9uVGV4dCwgSW9uVGV4dGFyZWEsIElvblRodW1ibmFpbCwgSW9uVGl0bGUsIElvblRvZ2dsZSwgSW9uVG9vbGJhciB9IGZyb20gJy4vZGlyZWN0aXZlcy9wcm94aWVzJztcclxuaW1wb3J0IHsgVmlydHVhbEZvb3RlciB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLWZvb3Rlcic7XHJcbmltcG9ydCB7IFZpcnR1YWxIZWFkZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1oZWFkZXInO1xyXG5pbXBvcnQgeyBWaXJ0dWFsSXRlbSB9IGZyb20gJy4vZGlyZWN0aXZlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLWl0ZW0nO1xyXG5pbXBvcnQgeyBJb25WaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsJztcclxuaW1wb3J0IHsgQW5ndWxhckRlbGVnYXRlIH0gZnJvbSAnLi9wcm92aWRlcnMvYW5ndWxhci1kZWxlZ2F0ZSc7XHJcbmltcG9ydCB7IENvbmZpZ1Rva2VuIH0gZnJvbSAnLi9wcm92aWRlcnMvY29uZmlnJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvbW9kYWwtY29udHJvbGxlcic7XHJcbmltcG9ydCB7IFBvcG92ZXJDb250cm9sbGVyIH0gZnJvbSAnLi9wcm92aWRlcnMvcG9wb3Zlci1jb250cm9sbGVyJztcclxuXHJcbmNvbnN0IERFQ0xBUkFUSU9OUyA9IFtcclxuICAvLyBwcm94aWVzXHJcbiAgSW9uQXBwLFxyXG4gIElvbkF2YXRhcixcclxuICBJb25CYWNrQnV0dG9uLFxyXG4gIElvbkJhY2tkcm9wLFxyXG4gIElvbkJhZGdlLFxyXG4gIElvbkJ1dHRvbixcclxuICBJb25CdXR0b25zLFxyXG4gIElvbkNhcmQsXHJcbiAgSW9uQ2FyZENvbnRlbnQsXHJcbiAgSW9uQ2FyZEhlYWRlcixcclxuICBJb25DYXJkU3VidGl0bGUsXHJcbiAgSW9uQ2FyZFRpdGxlLFxyXG4gIElvbkNoZWNrYm94LFxyXG4gIElvbkNoaXAsXHJcbiAgSW9uQ29sLFxyXG4gIElvbkNvbnRlbnQsXHJcbiAgSW9uRGF0ZXRpbWUsXHJcbiAgSW9uRmFiLFxyXG4gIElvbkZhYkJ1dHRvbixcclxuICBJb25GYWJMaXN0LFxyXG4gIElvbkZvb3RlcixcclxuICBJb25HcmlkLFxyXG4gIElvbkhlYWRlcixcclxuICBJb25JY29uLFxyXG4gIElvbkltZyxcclxuICBJb25JbmZpbml0ZVNjcm9sbCxcclxuICBJb25JbmZpbml0ZVNjcm9sbENvbnRlbnQsXHJcbiAgSW9uSW5wdXQsXHJcbiAgSW9uSXRlbSxcclxuICBJb25JdGVtRGl2aWRlcixcclxuICBJb25JdGVtR3JvdXAsXHJcbiAgSW9uSXRlbU9wdGlvbixcclxuICBJb25JdGVtT3B0aW9ucyxcclxuICBJb25JdGVtU2xpZGluZyxcclxuICBJb25MYWJlbCxcclxuICBJb25MaXN0LFxyXG4gIElvbkxpc3RIZWFkZXIsXHJcbiAgSW9uTWVudSxcclxuICBJb25NZW51QnV0dG9uLFxyXG4gIElvbk1lbnVUb2dnbGUsXHJcbiAgSW9uTmF2LFxyXG4gIElvbk5hdkxpbmssXHJcbiAgSW9uTm90ZSxcclxuICBJb25Qcm9ncmVzc0JhcixcclxuICBJb25SYWRpbyxcclxuICBJb25SYWRpb0dyb3VwLFxyXG4gIElvblJhbmdlLFxyXG4gIElvblJlZnJlc2hlcixcclxuICBJb25SZWZyZXNoZXJDb250ZW50LFxyXG4gIElvblJlb3JkZXIsXHJcbiAgSW9uUmVvcmRlckdyb3VwLFxyXG4gIElvblJpcHBsZUVmZmVjdCxcclxuICBJb25Sb3csXHJcbiAgSW9uU2VhcmNoYmFyLFxyXG4gIElvblNlZ21lbnQsXHJcbiAgSW9uU2VnbWVudEJ1dHRvbixcclxuICBJb25TZWxlY3QsXHJcbiAgSW9uU2VsZWN0T3B0aW9uLFxyXG4gIElvblNrZWxldG9uVGV4dCxcclxuICBJb25TbGlkZSxcclxuICBJb25TbGlkZXMsXHJcbiAgSW9uU3Bpbm5lcixcclxuICBJb25TcGxpdFBhbmUsXHJcbiAgSW9uVGFiQmFyLFxyXG4gIElvblRhYkJ1dHRvbixcclxuICBJb25UZXh0LFxyXG4gIElvblRleHRhcmVhLFxyXG4gIElvblRodW1ibmFpbCxcclxuICBJb25Ub2dnbGUsXHJcbiAgSW9uVG9vbGJhcixcclxuICBJb25UaXRsZSxcclxuXHJcbiAgSW9uVGFicyxcclxuXHJcbiAgLy8gbmdNb2RlbCBhY2Nlc3NvcnNcclxuICBCb29sZWFuVmFsdWVBY2Nlc3NvcixcclxuICBOdW1lcmljVmFsdWVBY2Nlc3NvcixcclxuICBSYWRpb1ZhbHVlQWNjZXNzb3IsXHJcbiAgU2VsZWN0VmFsdWVBY2Nlc3NvcixcclxuICBUZXh0VmFsdWVBY2Nlc3NvcixcclxuXHJcbiAgLy8gbmF2aWdhdGlvblxyXG4gIElvblJvdXRlck91dGxldCxcclxuICBJb25CYWNrQnV0dG9uRGVsZWdhdGUsXHJcbiAgTmF2RGVsZWdhdGUsXHJcbiAgUm91dGVyTGlua0RlbGVnYXRlLFxyXG5cclxuICAvLyB2aXJ0dWFsIHNjcm9sbFxyXG4gIFZpcnR1YWxGb290ZXIsXHJcbiAgVmlydHVhbEhlYWRlcixcclxuICBWaXJ0dWFsSXRlbSxcclxuICBJb25WaXJ0dWFsU2Nyb2xsXHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogREVDTEFSQVRJT05TLFxyXG4gIGV4cG9ydHM6IERFQ0xBUkFUSU9OUyxcclxuICBwcm92aWRlcnM6IFtBbmd1bGFyRGVsZWdhdGUsIE1vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJdLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25pY01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnPzogSW9uaWNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPElvbmljTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSW9uaWNNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHByb3ZpZGU6IENvbmZpZ1Rva2VuLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxyXG4gICAgICAgICAgdXNlRmFjdG9yeTogYXBwSW5pdGlhbGl6ZSxcclxuICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgZGVwczogW1xyXG4gICAgICAgICAgICBDb25maWdUb2tlbixcclxuICAgICAgICAgICAgRE9DVU1FTlQsXHJcbiAgICAgICAgICAgIE5nWm9uZVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19