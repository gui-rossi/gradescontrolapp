package com.rn;

import java.util.List;
import java.util.Arrays;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  protected String getMainComponentName() {
    return "rn";
  }

  protected List<ReactPackage> getPackages() {
      return Arrays.asList(
              new MainReactPackage()
      );
  }

}
