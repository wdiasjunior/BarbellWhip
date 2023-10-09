package com.barbellwhip;

import androidx.core.content.FileProvider;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class FileOpenerModule extends ReactContextBaseJavaModule {

  public FileOpenerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "FileOpenerModule";
  }

  @ReactMethod
  public void openFile(String filePath) {
    try {
      Uri uri = FileProvider.getUriForFile(getReactApplicationContext(), getReactApplicationContext().getPackageName() + ".provider", new File(filePath));
      Intent intent = new Intent(Intent.ACTION_VIEW);
      intent.setDataAndType(uri, "application/vnd.android.package-archive");
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

      getCurrentActivity().startActivity(intent);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
