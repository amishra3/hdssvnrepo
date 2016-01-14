/*
 * Decompiled with CFR 0_110.
 * 
 * Could not load the following classes:
 *  com.hdscorp.cms.util.MultifieldUtil
 *  javax.inject.Inject
 *  javax.inject.Named
 *  org.apache.sling.api.resource.Resource
 *  org.apache.sling.models.annotations.Default
 *  org.apache.sling.models.annotations.Model
 */
package com.hdscorp.cms.slingmodels;

import com.hdscorp.cms.util.MultifieldUtil;
import javax.inject.Inject;
import javax.inject.Named;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;

@Model(adaptables={Resource.class})
public class TwitterFeedModel
extends MultifieldUtil {
    @Inject
    @Named(value="twtitle")
    @Default(values={"twtitle"})
    private String title;
    @Inject
    @Named(value="jcr:imagePath3")
    @Default(values={"Background image path"})
    private String bGImagePath;
    @Inject
    @Named(value="twimportpath")
    @Default(values={"Twitter Import Path"})
    private String importPath;
    @Inject
    @Named(value="twtwittericonpath")
    @Default(values={"Twitter Icon Path"})
    private String iconPath;
    @Inject
    @Named(value="twsocialfollowuslabel")
    @Default(values={"Social FollowUS Label"})
    private String socialFollowUsLabel;

    public String getSocialFollowUsLabel() {
        return this.socialFollowUsLabel;
    }

    public String getTitle() {
        return this.title;
    }

    public String getbGImagePath() {
        return this.bGImagePath;
    }

    public String getImportPath() {
        return this.importPath;
    }

    public String getIconPath() {
        return this.iconPath;
    }
}
